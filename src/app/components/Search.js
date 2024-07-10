/* eslint-disable @next/next/no-css-tags */
"use client"

export default function Search() {
    return (
        <>
        {/*Search*/}
        <form>
          <div className="row p-3">
            <div className="col-6">
              <input type="text" className="form-control" placeholder="Search..." />
            </div>
          </div>
        </form>
        {/*Search*/}
      </>
    );
}