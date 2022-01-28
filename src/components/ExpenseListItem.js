import React from 'react';
import { Link, resolvePath } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = props => (
    <div>
        <Link to={`/edit/${props._id}`}>
            <h3>{props.description}</h3>
        </Link>
        <p>
            {`Rs${numeral(props.amount).format('0,0.00')} - ${moment(props.createdAt).format('Do MMMM YYYY')}`}
        </p>
    </div>
);

export default ExpenseListItem;