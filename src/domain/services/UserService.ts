import { User } from "../entities/User";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";

export class UserService {
    private userRepository: UserRepository;

    constructor(){
        this.userRepository = new UserRepository();
    }

    getAllUsers(): User[] {
        return this.userRepository.getAllUsers();
    }
    
    getUserByUsername(username: string): User | undefined {
        return this.userRepository.getUserByUsername(username)
    }

    addUser(user: User): void {
        this.userRepository.addUser(user);
    }

    updateUser(updatedUser: User): void {
        this.userRepository.updateUser(updatedUser)
    }

    deleteUser(id: string): void {
        this.userRepository.deleteUser(id)
    }
}