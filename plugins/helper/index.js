import DateTime from '@/plugins/helper/DateTime'
import Filter from '@/plugins/helper/Filter'
import Language from '@/plugins/helper/Language'


//import tester from '@/plugins/helper/tester'

export default ({ app }, inject) => {
    inject('helper',  {
    
        DateTime,Filter,Language
      
    })
  }
  