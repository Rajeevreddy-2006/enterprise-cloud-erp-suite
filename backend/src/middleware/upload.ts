import multer from "multer";
import path from "path";
import fs from "fs";

if(

   !fs.existsSync(

      "uploads"

   )

){

   fs.mkdirSync(

      "uploads"

   );

}

const storage = multer.diskStorage({

   destination:(req,file,cb)=>{

      cb(

         null,

         "uploads"

      );

   },

   filename:(req,file,cb)=>{

      cb(

         null,

         Date.now()

         +

         "-"

         +

         file.originalname

      );

   }

});

const fileFilter=(

   req:any,

   file:any,

   cb:any

)=>{

   const allowed=[

      ".pdf",

      ".doc",

      ".docx",

      ".png",

      ".jpg",

      ".jpeg"

   ];

   const ext=

      path.extname(

         file.originalname

      )

      .toLowerCase();

   if(

      allowed.includes(

         ext

      )

   ){

      cb(

         null,

         true

      );

   }

   else{

      cb(

         new Error(

            "Invalid file type"

         ),

         false

      );

   }

};

export default multer({

   storage,

   fileFilter

});