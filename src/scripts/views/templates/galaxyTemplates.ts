export const galaxyViewOptions = 
`<div class="container view-galaxy">
    <div class="title">
        Galaxy View
    </div>
    <div class="body vertical-stack">
        <div class="field">
            <label>
                <input id="toggle-galaxies" type="checkbox" checked> Galaxies
            </label>
        </div>
        <div class="field">
            <label>
                <input id="toggle-pins" type="checkbox" checked> System pins
            </label>
        </div>
        <div class="field">
            <label>
                <input id="toggle-names" type="checkbox" checked> System names
            </label>
        </div>
        <div class="field">
            <label>
                <input id="toggle-links" type="checkbox" checked> System links
            </label>
        </div>
        <div class="field">
            <label>
                <input id="toggle-wormholes" type="checkbox" checked> System wormholes
            </label>
        </div>
        <div class="field">
            <label>
                <input id="toggle-hidden-wormholes" type="checkbox"> Show hidden wormholes
            </label>
        </div>
    </div>
</div>`;

export const systemDetails = 
`<div class="container view-galaxy">
    <div class="title">
        Star system info
    </div>
    <div class="body vertical-stack">
        <div id="system-name" class="field">Name: <span class="value"></span></div>
        <div id="system-position" class="field">Position (x, y): <span class="value"></span></div>
        <div id="system-government" class="field">Government: <span class="value"></span></div>
        <div id="system-attributes" class="field">Attributes: <span class="value"></span></div>
    </div>
</div>`;
