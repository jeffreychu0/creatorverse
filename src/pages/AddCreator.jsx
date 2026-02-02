import React from "react";

export default function AddCreator() {

    
    
    return (
        <>
            <div>
                <form>
                    <label for="name">Creator Name: </label>
                    <input type="text" id="name" name="name" required/>

                    <br/>
                    <label for="url">Creator URL: </label>
                    <input type="text" id="url" name="url"/>

                    <br/>

                    <label for="imgUrl">Creator Image URL: </label>
                    <input type="text" id="imgUrl" name="imgUrl"/>

                    <br/>

                    <label for="desc">desc: </label>
                    <textarea id="desc" name="desc" rows="4" cols="50"></textarea>

                    <br/>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}