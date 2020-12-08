import LoadingDialog from "../Dialog/OtherDialog/LoadingDialog";
import React, {useEffect, useState} from "react";
import NotFound from "../../components/Others/NotFound";

const AuthContainer = (props) => {
    const [authState, setAuth] = useState('loading');
    const {authorize} = props;
    useEffect(() => {
        (async () => {
            try {
                await authorize();
                setAuth('authorized');
            } catch (e) {
                setAuth('forbidden');
            }
        })();
    }, []);
    if (authState === 'loading') {
        return <LoadingDialog open={true}/>
    } else if (authState === 'forbidden') {
        return <NotFound/>
    } else {
        return props.children;
    }
}

export default AuthContainer;
