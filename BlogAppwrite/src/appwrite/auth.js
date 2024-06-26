import config from '../config/config'
import {Client, Account, ID } from "appwrite"

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(config.appwrite_url)
            .setProject(config.appwrite_ProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            if(userAccount) {
                this.login(email, password)
            }
            else {
                return userAccount;
            }
        } catch (error) {
            console.log("Appwrite :: createAccount :: error ", error);
        }
    }

    async login(email, password){
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("Appwrite :: login :: error ",error);
        }
    }

    async getLoginInfo(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite :: getLoginInfo :: error ",error);
        }
        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite :: logout :: error ",error);
        }
    }
};

const authService = new AuthService();

export default authService;