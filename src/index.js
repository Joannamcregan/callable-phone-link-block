import {PanelBody, PanelRow} from "@wordpress/components"
import {InspectorControls, InnerBlocks} from "@wordpress/block-editor"

wp.blocks.registerBlockType("jjcpn/phone-link", {
    title: "Phone Number Link",
    icon: "phone",
    category: "common",
    attributes: {
        linkText: {type: "string", default: "Call Now!"},
        borderSize: {type: "integer", default: 5},
        borderRadius: {type: "integer", default: 15}
    },
    supports: {
        spacing: {
            margin: true,  // Enable margin UI control.
            padding: true, // Enable padding UI control.
            blockGap: true,  // Enables block spacing UI control for blocks that also use `layout`.
        },
        color: {
            gradients: true
        },
        typography: {
            fontSize: true,
            lineHeight: true,
        },
    },
    edit: EditPhoneNumber,
    save: function(props) {
        return <InnerBlocks.Content />
    }
})

function EditPhoneNumber(props) {
    return (
        <>
            <InspectorControls>
                <PanelBody title="Phone Number" initialOpen={true}>
                    <PanelRow>
                        <div>
                            <p>To input or change your business phone number, click on "settings" in the left-side menu of the main admin dashboard, then select "phone number".</p>
                        </div>
                    </PanelRow>
                    <PanelRow>
                        <p>Enter the text you would like to appear in your button</p>
                        <input type="text" placeholder="Call Now!" value={props.attributes.linkText} onChangeComplete={x => props.setAttributes({linkText: x.value})} />
                    </PanelRow>
                </PanelBody>
                <PanelBody title="Button Border">
                    <PanelRow>
                        <p>Border thickness:</p>
                        <input type="text" placeholder="5" value={props.attributes.borderSize} onChangeComplete={x => props.setAttributes({borderSize: x.value})} />
                        <span>px</span>
                    </PanelRow>
                    <PanelRow>
                        <p>Border radius:</p>
                        <input type="text" placeholder="15" value={props.attributes.borderRadius} onChangeComplete={x => props.setAttributes({borderRadius: x.value})} />
                        <span>px</span>
                    </PanelRow>
                </PanelBody>
            </InspectorControls>
            <InnerBlocks allowedBlocks={["core/paragraph", "core/image", "core/button"]} />
        </>
    )
}