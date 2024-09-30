import React from 'react';
import classes from './pagination.module.css';
import ReactPaginate from 'react-paginate';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

interface PaginationProps {
    setItemOffset: (offset: number) => void;
    itemsPerPage: number;
    reviews: any[]; // You can replace `any[]` with the correct type of reviews if you know the structure
}

const Pagination: React.FC<PaginationProps> = ({
    setItemOffset,
    itemsPerPage,
    reviews
}) => {

    const handlePageClick = (event: { selected: number }) => {
        const newOffset = (event.selected * itemsPerPage) % reviews.length;
        setItemOffset(newOffset);
    };

    return (
        <ReactPaginate
            nextClassName={`${classes.item} ${classes.nextArrow}`}
            previousClassName={`${classes.item} ${classes.previousArrow}`}
            pageClassName={`${classes.item}`}
            activeClassName={`${classes.item} ${classes.active}`}
            breakClassName={`${classes.item}`}
            containerClassName={`${classes.pagination}`}
            breakLabel="..."
            previousLabel={<AiOutlineArrowLeft size={25} />}
            nextLabel={<AiOutlineArrowRight size={25} />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={Math.ceil(reviews.length / itemsPerPage)}
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;
