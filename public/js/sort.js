const sortData =(data ,sortBy, sortOrder)=>{
    data.sort((a, b) => {
        let compareA = a[sortBy];
        let compareB = b[sortBy];

        // Handle cases where values might be null or undefined
        if (compareA === null || compareA === undefined) compareA = '';
        if (compareB === null || compareB === undefined) compareB = '';

     

        if (compareA < compareB) {
            return sortOrder === 'ASC' ? -1 : 1;
        }
        if (compareA > compareB) {
            return sortOrder === 'ASC' ? 1 : -1;
        }
        return 0;
    });


}

module.exports = {sortData}