// import { forwardRef } from "react";

// function Video(props, ref) {
//     return (
//         <video
//             ref={ref}
//             {...props}
//             style={{ display: "none" }}
//         />

//     )
// }

// export default forwardRef(Video);

import { forwardRef, memo } from 'react';

const Video = forwardRef((props, ref) => {
    return (
        <video
            ref={ref}
            {...props}
            style={{ display: "none" }}
        />
    );
});

Video.displayName = 'Video';

const MemoizedVideo = memo(Video);
MemoizedVideo.displayName = 'Video';

export default MemoizedVideo;