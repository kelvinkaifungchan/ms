import React, { useEffect, useState } from 'react'

type ButtonProps = {
    button: string;
    submit?: ((event: React.MouseEvent<HTMLButtonElement>) => void) | (() => void);
    disabled?: boolean;
    type?: string;
  };
  

export const Button: React.FC<ButtonProps> = ({button, submit, disabled, type}) => {
    return (
        <>
        {
            type === "danger" ? (
                <button disabled={disabled || false} className={`p-1 border border-red rounded-md ${ disabled ? "opacity-50" : "hover:bg-red hover:text-black hover:cursor-pointer"} duration-150 text-red hover:bg-[#009900]`} onClick={(e) => {submit ? submit(e) : null}}>
                    {button}
                </button>
            )
            :
            (
                <button disabled={disabled || false} className={`p-1 border border-lightgreen rounded-md ${ disabled ? "opacity-50" : "hover:cursor-pointer hover:opacity-50"} duration-150`} onClick={(e) => {submit ? submit(e) : null}}>
                    {button}
                </button>
            )
        }
        </>

    )
}