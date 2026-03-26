import React from 'react';
import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({ pageCount, currentPage, onPageChange }) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      forcePage={currentPage}
      onPageChange={({ selected }) => onPageChange(selected)}
      containerClassName="flex items-center justify-center space-x-2"
      pageClassName="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm text-gray-600 hover:bg-gray-100"
      pageLinkClassName="flex items-center justify-center w-full h-full"
      activeClassName="!bg-teal-50 !text-teal-600 font-medium"
      previousClassName="inline-flex items-center justify-center w-8 h-8 rounded-full text-gray-600 hover:bg-gray-100"
      nextClassName="inline-flex items-center justify-center w-8 h-8 rounded-full text-gray-600 hover:bg-gray-100"
      previousLabel={<ChevronLeft className="w-4 h-4" />}
      nextLabel={<ChevronRight className="w-4 h-4" />}
      breakLabel="..."
      breakClassName="text-gray-400"
    />
  );
}