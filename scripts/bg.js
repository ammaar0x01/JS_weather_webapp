/*
Used to change the background of a webpage
*/

const bgImages = [
    // "../images/image (1).webp", 
    "../images/image (2).webp", 
    "../images/image (3).webp", 
    "../images/image (4).webp", 
    "../images/image (5).webp", 
    "../images/image (6).webp", 
    // "../images/image (7).webp"
]

/**
 * Changes the background to a random image 
 */
function updateBg(){
    let randomInt = Math.round(Math.random() * bgImages.length)
    if (randomInt == bgImages.length){
        randomInt -= 1
    }

    const body = window.document.body 
    body.style.backgroundImage = `url('${bgImages[randomInt]}')`
}
updateBg()
