import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({currentPage, onPageChange}) => {
    const commonStyle = 'flex cursor-pointer border border-2 rounded-full hover:bg-green-400 hover:text-white h-10 w-10 items-center justify-center';
    const ellipsisStyle = 'flex cursor-default border border-2 rounded-full h-10 w-10 items-center justify-center';

    const renderPageItem = (pageNumber, isCurrent) => (
        <div
            className={`${commonStyle} ${isCurrent ? "opacity-40 bg-green-400 text-white" : "bg-white"}`}
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
        >
            {pageNumber}
        </div>
    );

    const renderEllipsis = (type) => (
        <div className={ellipsisStyle} key={type}>
            ...
        </div>
    );

    const renderPagination = () => {
        const pageItems = [];

        for (let i = currentPage < 3 ? 1 : currentPage; i <= currentPage + 3; i++) {
            if (currentPage > 2 && i === currentPage) {
                pageItems.push(renderEllipsis('prev'));
            }

            pageItems.push(renderPageItem(i, i === currentPage));

            if (i === currentPage + 3) {
                pageItems.push(renderEllipsis('next'));
            }
        }

        return pageItems;
    };

    return (
        <div className="flex gap-10 items-center justify-center m-4">
            <div className={`${commonStyle}`} onClick={() => {
                if (currentPage > 1) onPageChange(currentPage - 1)
            }}>
                &laquo;
            </div>
            {renderPagination()}
            <div className={`${commonStyle}`} onClick={() => onPageChange(currentPage + 1)}>
                &raquo;
            </div>
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;