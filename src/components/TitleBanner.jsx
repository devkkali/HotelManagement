import { useState } from "react"

export default function TitleBanner(params) {
    const [marginBotton, setMarginBottom] = useState(params.marginBotton)
    const [padding, setPadding] = useState(params.padding)
    const [title, setTitle] = useState(params.title)
    // margin-bottom
    // padding

    return (
        <>
            <div style={{ marginBottom: `${marginBotton}` }} className="back_re">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="title">
                                <h2 style={{ padding: `${padding}px 0` }} >{title}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}