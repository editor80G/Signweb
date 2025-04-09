import styles from './AccessDenied.module.css';

const AccessDenied = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Access Denied</h2>
            <p>You do not have permission to view this page.</p>
        </div>
    );
};

export default AccessDenied;