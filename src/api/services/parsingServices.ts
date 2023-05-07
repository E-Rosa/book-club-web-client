class ParsingService{
    static parseDateToBrazilianString(date: Date){
        const dateString = date.toString().split("T")[0]
        const day = dateString.split("-")[2];
        const month = dateString.split("-")[1];
        const year = dateString.split("-")[0];
        return [day, month, year].join("-")
    }
}

export default ParsingService;