import LoadingDialog from "../Dialog/OtherDialog/LoadingDialog";
import React, {useEffect, useState} from "react";
import Error from "../../components/Others/Error";

const AuthContainer = (props) => {
    const [authState, setAuth] = useState('loading');
    const {authorize} = props;
    useEffect(() => {
        (async () => {
            try {
                await authorize();
                await setAuth('authorized');
            } catch (e) {
                await setAuth('forbidden');
            }
        })();
    }, [authorize]);
    if (authState === 'loading') {
        return <LoadingDialog open={true}/>
    } else if (authState === 'forbidden') {
        return <Error code={403} mess='Forbidden'/>
    } else {
        return props.children;
    }
}

export default AuthContainer;
