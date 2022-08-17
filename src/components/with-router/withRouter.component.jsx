import { useNavigate, useParams, useLocation } from "react-router-dom";

const withRouter = WrappedComponent => {
    const WrappedComponentWithRouter = (props) => {
        const location = useLocation();
        const params = useParams();
        const navigate = useNavigate();
        return <WrappedComponent
            location={location}
            params={params}
            navigate={navigate}
            { ... props }
        />
    }

    return WrappedComponentWithRouter;
}

export default withRouter;