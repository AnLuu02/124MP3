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

import React, { forwardRef } from 'react';

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

const MemoizedVideo = React.memo(Video);
MemoizedVideo.displayName = 'Video';

export default MemoizedVideo;