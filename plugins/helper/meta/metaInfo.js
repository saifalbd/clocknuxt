export  class  metaInfo{
 // follow https://gist.github.com/MicBrain/46a9723158307fd30db66a4b2af85411
 
                constructor(){
                this.AddKeywords = []
                this.AddDescription = ''
                }

                    set keywords(val){
                    this.AddKeywords.push(val)
                    }

                    get keywords(){
                        try{
                            if(!this.AddKeywords[0]) throw 'not set keywords please set before keywords then call'
                            
                            return {
                                name:"keywords",
                                content:`${this.AddKeywords.join(',')}`
                            }


                            

                        }catch(err){
                        console.error(err)
                        }
                    
                    }
                set description(val){
                
                try{
                if(!val) throw 'value not define set description'
                if(typeof val !='string') throw 'value not type of string ( set description)'

                    this.AddDescription = {
                        name:"description",
                        content:`${val}`
                    }

                }
                catch(err){
                    console.error(err)
                }
                   
                }
              get description(){
                    return this.AddDescription
                }


                }