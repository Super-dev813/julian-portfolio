# Hero videos

`public/reel/*.mp4` are rendered from `scenes.html`, not filmed. Each scene is a pure function of
time (`render(t)`), so every frame is captured exactly. The code, terminal, and dashboards are
illustrative of the kind of work Julián does, not his production code or real metrics; the
products scene uses the public screenshots in `public/projects/`.

## Re-render

1. Serve the scenes from the dev server: `cp reel/scenes.html public/__reel.html` and run `pnpm dev --port 6200`.
2. For each scene (`build`, `ship`, `observe`, `products`), open
   `http://localhost:6200/__reel.html?scene=<name>` at 1280×720, call `window.render(i / 24)` for
   `i = 0 … 143`, and save a JPEG screenshot per frame as `frames/<name>/f0000.jpg …`.
3. Encode with AVFoundation (macOS, no ffmpeg needed):

       swiftc -O reel/encode.swift -o /tmp/encode
       /tmp/encode frames/<name> public/reel/<name>.mp4 24 2500000

4. Poster: `cwebp -q 72 frames/<name>/f0110.jpg -o public/reel/<name>.webp`.
5. Remove `public/__reel.html` before committing.
