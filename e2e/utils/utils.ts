import fs from "fs";

export class File_Reader{

    get json_Data(){
        const raw = fs.readFileSync("filepath", "utf-8");
        const data = JSON.parse(raw);
        return data;
    }
    
}