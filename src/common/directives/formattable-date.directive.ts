import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver, GraphQLField, GraphQLString } from 'graphql';
import dateFormat from 'dateformat';

export class FormattableDateDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field;
    const { defaultFormat } = this.args;

    // field.args.push({
    //     name: "format",
    //     type: GraphQLString
    // });

    field.resolve = async function (
      source,
      { format, ...otherArgs },
      context,
      info,
    ) {
      const date = await resolve.call(this, source, otherArgs, context, info);

      // If a format argument was not provided, default to the optional
      // defaultFormat argument taken by the @date directive:
      if (date == null) {
        return null;
      }
      
      return dateFormat(date, format || defaultFormat);
    };

    field.type = GraphQLString;
  }
}
