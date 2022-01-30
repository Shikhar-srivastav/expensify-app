import React from 'react';
import { Link, resolvePath } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = props => (
    <Link to={`/edit/${props._id}`}>
        <div className='list-item'>
            <div>
                <h3>{props.description}</h3>
                <span className='list-item__date'>
                    {moment(props.createdAt).format('Do MMMM YYYY')}
                </span>
            </div>
            <div>
                <h3 className='list-item__price'>Rs{numeral(props.amount).format('0,0.00')}</h3>
            </div>
        </div>
    </Link>
);

export default ExpenseListItem;