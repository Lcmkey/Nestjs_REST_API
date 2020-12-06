import { Scalar, CustomScalar } from '@nestjs/graphql'
import { GraphQLUpload } from 'graphql-upload'

@Scalar('Upload')
export class UploadScalar implements CustomScalar<object, string> {
    description = 'Upload custom scalar type'

    parseValue(value: any) {
        return GraphQLUpload.parseValue(value)
    }

    serialize(value: any) {
        return GraphQLUpload.serialize(value)
    }

    parseLiteral(ast: any) {
        return GraphQLUpload.parseLiteral(ast, ast.value)
    }
}