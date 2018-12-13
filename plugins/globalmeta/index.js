
const meta = {
appName: 'Pray Times'
}









export default ({ app }, inject) => {
    inject('ssrMeta',  {
    
        meta
      
    })
  }
  