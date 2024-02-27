import {PanelBody, PanelRow, TextControl} from "@wordpress/components"
import {InspectorControls, BlockControls, AlignmentToolbar} from "@wordpress/block-editor"

wp.blocks.registerBlockType("jjcpn/phone-link", {
    title: "Phone Number Link",
    icon: "phone",
    category: "common",
    attributes: {
        linkText: {type: "string", default: "Call Now!"},
        theAlignment: {type: "string", default: "center"}
    },
    supports: {
        spacing: {
            margin: true,  // Enable margin UI control.
            padding: true, // Enable padding UI control.
            blockGap: true,  // Enables block spacing UI control for blocks that also use `layout`.
        },
        color: {
            gradients: true,
            background: false
        },
        typography: {
            fontSize: true,
            lineHeight: true,
        },
    },
    edit: EditPhoneNumber,
    save: function(props) {
        return null
    }
})

function EditPhoneNumber(props) {
    function updateLinkText(value) {
        props.setAttributes({ linkText: value })
    }
    return (
        <div>
            <BlockControls>
                <AlignmentToolbar value={props.attributes.theAlignment} onChange={x => props.setAttributes({ theAlignment: x })} />
            </BlockControls>
            <InspectorControls>
                <PanelBody title="Phone Number" initialOpen={true}>
                    <PanelRow>
                        <div>
                            <p>To input or change your business phone number, click on "settings" in the left-side menu of the main admin dashboard, then select "phone number".</p>
                        </div>
                    </PanelRow>
                    <PanelRow>
                        <TextControl label="Link Text" placeholder="Call Now!" value={props.attributes.linkText} onChange={updateLinkText} />
                    </PanelRow>
                </PanelBody>
            </InspectorControls>
            <p style={{textAlign: `${props.attributes.theAlignment}`}}>
                <u>
                    {props.attributes.linkText}
                </u>
            </p>
        </div>
    )
}