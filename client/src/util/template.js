import { Typography} from "@mui/material";


 export  const template = (data) =>{
        return(
            <Typography align="center" className="bg-slate-50 rounded-full  font-bold ">
               <i class="fas fa-motorcycle"></i>
                  &emsp;{data}
           </Typography>
        )
    }
