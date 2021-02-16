import React from 'react'
import { render } from '@testing-library/react';
import { List, ListChapter } from '../Components/ListChapter';

test("renders ListChapters without crashing", () => {
    const props = {
        line_1 : "line 1",
        onClick : () => {}
    };
    render(<ListChapter {...props}/>);
   });

   test("List renders without crashing", () => {
    const items = [{ field_1 : "A1", field_2 : "A2"}, { field_1 : "B1", field_2 : "B2"}]
    const fields = ["f1", "f2"]
    const props = {
        items : items,
        fields : fields,
        onClick : () => {}
    };
    render(<List {...props}/>)
});