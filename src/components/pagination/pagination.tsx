import { Dispatch, FunctionComponent, SetStateAction, MouseEvent } from "react";

interface PaginationProps{
    totalTimelineItemsCount: number;
    amountToSkip: number;
    amountToSkipSetter: Dispatch<SetStateAction<number>>
}

const PaginationComponent: FunctionComponent<PaginationProps> = (props) =>{
    //responsibility: display the right quantity of pagination numbers, highlight the
    //actual page and handle page changes

    function handleChangePage(event: MouseEvent<HTMLButtonElement>) {
        const pageClicked = parseInt(event.currentTarget.id);
        const amountToSkip = pageClicked * 10 - 10;
        window.scrollTo(0, 0);
        props.amountToSkipSetter(amountToSkip);
      }
    const paginationNumberButtons = () => {
        const booksPages = Array.from(Array(Math.ceil(props.totalTimelineItemsCount / 10)));
        const getPaginationNumberButtonsByCount = (pages: undefined[]) => {
          return pages.map((_, index) => {
            if (props.amountToSkip / 10 == index || (props.amountToSkip == 0 && index == 0)) {
              return (
                <button
                  className="red-pagination-button"
                  id={`${index + 1}`}
                  onClick={handleChangePage}
                  key={index}
                >
                  {index + 1}
                </button>
              );
            } else {
              return (
                <button
                  className="white-pagination-button"
                  id={`${index + 1}`}
                  key={index}
                  onClick={handleChangePage}
                >
                  {index + 1}
                </button>
              );
            }
          });
        };
    
        return getPaginationNumberButtonsByCount(booksPages);
      };
    
    return (
        <>
            {paginationNumberButtons()}
        </>
    )
}

export default PaginationComponent