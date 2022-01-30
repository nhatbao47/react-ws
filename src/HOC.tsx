import React from "react";
const withNameChange = (BaseComponent:any) => (props: any) => {
    return <BaseComponent {...props} name="New name" />;
}

export default withNameChange;