         export     class langName {

                get codeName(){
                return [
                    {code:"az",name:"Azerbaijani"},{code:"bn",name:"Bengali; Bangla"},{code:"cs",name:"Czech"},{code:"de",name:"German"},{code:"dv",name:"Divehi; Dhivehi; Maldivian;"},{code:"en",name:"English"},{code:"fa",name:"Persian (Farsi)"},{code:"fr",name:"French"},{code:"ha",name:"Hausa"},{code:"hi",name:"Hindi"},{code:"id",name:"Indonesian"},{code:"it",name:"Italian"},{code:"ja",name:"Japanese"},{code:"ko",name:"Korean"},{code:"ku",name:"Kurdish"},{code:"ml",name:"Malayalam"},{code:"nl",name:"Dutch"},{code:"no",name:"Norwegian"},{code:"pl",name:"Polish"},{code:"pt",name:"Portuguese"},{code:"ro",name:"Romanian"},{code:"ru",name:"Russian"},{code:"sd",name:"Sindhi"},{code:"so",name:"Somali"},{code:"sq",name:"Albanian"},{code:"sv",name:"Swedish"},{code:"sw",name:"Swahili"},{code:"ta",name:"Tamil"},{code:"tg",name:"Tajik"},{code:"th",name:"Thai"},{code:"tr",name:"Turkish"},{code:"tt",name:"Tatar"},{code:"ug",name:"Uyghur, Uighur"},{code:"ur",name:"Urdu"},{code:"uz",name:"Uzbek"},{code:"es",name:"Spanish; Castilian"},{code:"bg",name:"Bulgarian"},{code:"bs",name:"Bosnian"},{code:"ms",name:"Malay"},{code:"zh",name:"Chinese"},{code:"ar",name:"Arabic"},{code:"si",name:"Sinhala, Sinhalese"},
                ]
                }
                validate(val){
                    try{
                        if(!val) throw ` argument can't empty `
                        if(typeof val !='string') throw 'argument must be string'
                        return val;
                        }catch(err){console.error(err)}
                }

                getName(val){ //val is code
                if(this.validate(val)){
                   
                    return   this.codeName.find((item)=>{
                        return item.code ===val;
                        }).name;


                }
                }

                isName(val){ //val is name
                    if(this.validate(val)){
                    const find = this.codeName.find((item)=>{
                        return item.name===val;
                        });
                return find? true : false

                    }

                }

                getCode(val){ //val is name
                    if(this.validate(val)){
                        return   this.codeName.find((item)=>{
                            return item.code ===val;
                            }).code;
                    
                    
                    }
                    }

                isCode(val){ //val is code
                    if(this.validate(val)){
                        const find = this.codeName.find((item)=>{
                            return item.code===val;
                            });
                    return find? true : false
                    
                        }
                    

                }


                }