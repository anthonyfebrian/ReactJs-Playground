import { UserResponse } from "../../data/remote/entity/response/UserResponse";
import { User } from "../../domain/entity/User";

export function mapUserResponseToDomain(response: UserResponse): User {
    return {
        email: response.email,
        name: response.name
    }
}