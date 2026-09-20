function createPlayerAnimations(image) {
    return {
        idle:
            new Animation(
                image,
                32,
                32,
                [
                    [0, 0],
                    [1, 0],
                    [2, 0],
                    [3, 0],
                ],
                0.15
        ),

        run: 
            new Animation(
                image,
                32,
                32,
                [
                    [0, 2],
                    [1, 2],
                    [2, 2],
                    [3, 2],
                    [4, 2],
                    [5, 2],
                    [6, 2],
                    [7, 2],
                    [0, 3],
                    [1, 3],
                    [2, 3],
                    [3, 3],
                    [4, 3],
                    [5, 3],
                    [6, 3],
                    [7, 3]
                ],
                0.08
        ),

        jump:
            new Animation(
                image,
                32,
                32,
                [[0, 2]],
                0.1
        ),

        fall: 
            new Animation(
                image,
                32,
                32,
                [[0,2]],
                0.1
        )
    };
}