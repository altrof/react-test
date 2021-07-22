import styles from "./FormsControls.module.css"

const FormControl = ({input, meta, child, element, ...props}) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
        <div>
        <element {...input} {...props} />
        </div>
           { hasError && <span>{meta.error}</span> }
        </div>
    )
}


export const Textarea = (props) => {
    return <FormControl {...props} element={"textarea"}></FormControl>
}

export const Input = (props) => {
    return <FormControl {...props} element={"input"}><input {...props} /></FormControl>
}

/* export const Input = ({input, meta , ...props}) => {
    const hasError = meta.touched && meta.error

    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
        <div>
        <input {...input} {...props} />
        </div>
           { hasError && <span>{meta.error}</span> }
        </div>
    )
} */