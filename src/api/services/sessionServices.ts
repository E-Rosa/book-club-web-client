class SessionServices{
    static getSessionToken(){
        return sessionStorage.getItem("jwt") as string;
    }
}

export default SessionServices