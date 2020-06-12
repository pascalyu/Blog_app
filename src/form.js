import React from "react";
import { Field } from "redux-form";
import classnames from "classnames";

export const renderField = ({ input, label, type, meta: { error } }) => {
    const classes = classnames(
        'form-control',
        {
            'is-invalid': error
        }

    )
    return (

        <div className="form-group">
            {type === "checkbox" ?
                <div>

                    <input {...input} id={input.name} type={type} />
                    <label htmlFor={input.name} >{label}</label>
                </div>
                :
                <div>
                    {label && <label htmlFor={input.name} >{label}</label>}
                    {type === "textarea" && <textarea {...input} id={input.name} className={classes} type={type} />}
                    {type !== "textarea" && <input {...input}  id={input.name} className={classes} type={type} />}
                </div>
            }

            {error && <small className="form-text text-danger">{error}</small>}
        </div>
    )

}