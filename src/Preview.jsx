import "./App.scss";

const shapeAttributes = {
    O: {
        height: 2,
        width: 2,
    },
    I: {
        height: 4,
        width: 1,
    },
    S: {
        height: 2,
        width: 3,
        emptyCellCoordinates: [[0,0], [1, 2]],
    },
    Z: {
        height: 2,
        width: 3,
        emptyCellCoordinates: [[0,2], [1, 0]],
    },
    T: {
        height: 2,
        width: 3,
        emptyCellCoordinates: [[1,0], [1, 2]],
    },
    L: {
        height: 3,
        width: 2,
        emptyCellCoordinates: [[0,1], [1, 1]],
    },
    J: {
        height: 3,
        width: 2,
        emptyCellCoordinates: [[0,0], [1, 0]],
    }
}

export default function ShapePreview({ shape }) {
    const shapeHeight = shapeAttributes[shape].height;
    const shapeWidth = shapeAttributes[shape].width;
    const emptyCellCoordinates = shapeAttributes[shape].emptyCellCoordinates;

    const shapeGrid = Array(shapeHeight).fill(null).map(() => Array(shapeWidth).fill(true));
    if (emptyCellCoordinates) {
        emptyCellCoordinates.forEach(([i, j]) => shapeGrid[i][j] = false);
    }


    return (
        <div className="preview-container">
            <div className="preview-title">
                NEXT SHAPE
            </div>
            <div className="shape">
                {shapeGrid.map((row) => (
                    <div className="shape-row">
                        {row.map((cell) => (
                            <div className={`shape-cell ${cell === true ? "marked" : ""}`}></div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}