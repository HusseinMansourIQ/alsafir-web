module.exports = {

     lists(req,res,next){

        premmisions = ["ادخال-مشاهدة", "تحرير","مدير"]
            if(premmisions.includes(req.user.role)){
                
                next()
            }else{
                res.json("ليس لديك الصلاحية")
            }
        
    },

    addition(req,res,next){

        premmisions = ["ادخال-مشاهدة", "تحرير","مدير", "ادخال"]
            if(premmisions.includes(req.user.role)){
                
                next()
            }else{
                res.json("ليس لديك الصلاحية")
            }
        
        },

        editor(req,res,next){

            premmisions = ["تحرير","مدير"]
                if(premmisions.includes(req.user.role)){
                    
                    next()
                }else{
                    res.json("ليس لديك الصلاحية")
                }
            
        },

        admin(req,res,next){

            premmisions = ["مدير"]
                if(premmisions.includes(req.user.role)){
                    
                    next()
                }else{
                    res.json("ليس لديك الصلاحية")
                }
            
        }
}