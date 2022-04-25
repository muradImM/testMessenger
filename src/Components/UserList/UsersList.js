import React from 'react';
import User from "../User/User";
import styles from "./styles.module.scss"

const UsersList = ({values}) => {

    return (
        <div>
            <h3 className={styles.headline}>Chats</h3>
            <div>
                {values?.map(e => <User key={e.id} {...e}/>)}
            </div>
        </div>
    );
};

export default UsersList;
