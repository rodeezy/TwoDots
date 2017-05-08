export const colorAnimate = (circle, stage) => {
    let filter = new createjs.ColorFilter(1,1.5,1,1);
	  circle.filters = [filter];
    circle.cache(-20,-20,40,40);

    createjs.Ticker.setFPS(60);
	  createjs.Ticker.addEventListener("tick", function(event){
        //console.log('tick');
        circle.updateCache();
    	stage.update(event);
    });

    var tween = createjs.Tween.get(filter, { loop: true })
    .to({redMultiplier:0, greenMultiplier:.7 }, 1000)
    .to({redMultiplier:1, greenMultiplier:1.5 }, 1000);
};

//loop on attribute to reduce memory fuck up
