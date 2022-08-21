import { Col } from 'react-bootstrap';

import './board-card.styles.css';

const BoardCard = ({ children, title }) => {
    return (
        <Col md={3} className='board-card-container'>
            <h2 className='board-card-title'>{title}</h2>
            <div className='board-card'>{children}</div>
        </Col>
    );
};

export default BoardCard;
