import Card from "../components/Card"
import AppContext  from "../components/context"
import React from "react"


function Favorites({items}) {

  const {onAddToFavorite} = React.useContext(AppContext)

    return (
      
        <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Мои закладки
          </h1>
          
        </div>
        <div className="sneakers d-flex flex-wrap">
         
        {items
            .map((item, index) => (
              <Card
                key={index}
                favorited={true}
                onClickFavorite ={onAddToFavorite}
                {...item}
                
               
              />
            ))}
        </div>
      </div>
    )
}

export default Favorites