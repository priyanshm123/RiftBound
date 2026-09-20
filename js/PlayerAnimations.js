function createPlayerAnimations(image) {
    return {
        idle:
            new Animation(
                image,
                32,
                32,
                4,
                0.15,
                0
        ),

        run: 
            new Animation(
                image,
                32,
                32,
                8,
                0.08,
                2
        )
    };
}