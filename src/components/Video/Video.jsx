import { forwardRef } from "react";

function Video(props, ref) {
    return (
        <video
            ref={ref}
            {...props}
            style={{ display: "none" }}
        />

    )
}

export default forwardRef(Video);
