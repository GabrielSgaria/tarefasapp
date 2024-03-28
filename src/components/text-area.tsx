import { HTMLProps } from "react";

export function TextArea({...rest}: HTMLProps<HTMLTextAreaElement>){
    return(
        <textarea className="w-full resize-none h-40 rounded-xl outline-none p-2"{...rest}></textarea>
    )
}