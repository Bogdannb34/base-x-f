import { Link } from 'react-router-dom';
import { Users } from '../components';

const Dashboard = () => {
    return (
        <section>
            <h1>Dashboard Page</h1>
            <br />
            <Users />
            <br />
            <div>
                <Link to='/'>Home</Link>
            </div>
        </section>
    )
}

export default Dashboard