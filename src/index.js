import {PanelBody, PanelRow} from "@wordpress/components"
import {InspectorControls, BlockControls, AlignmentToolbar} from "@wordpress/block-editor"

wp.blocks.registerBlockType("jjcpn/phone-link", {
    title: "Phone Number Link",
    icon: "phone",
    category: "common",
    // attributes: {
    //     theAlignment: {type: "string", default: "center"}        
    // },
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
            lineHeight: true
        },
        align: true
    },
    edit: EditPhoneNumber,
    save: function(props) {
        return null
    }
})

function EditPhoneNumber(props) {
    function updateLinkAlignment(value) {
        props.setAttributes({ theAlignment: value })
    }
    return (
        <div>
            {/* <BlockControls>
                <AlignmentToolbar value={props.attributes.theAlignment} onChange={updateLinkAlignment} />
            </BlockControls> */}
            <InspectorControls>
                <PanelBody title="Phone Number" initialOpen={true}>
                    <PanelRow>
                        <div>
                            <p>To input or change your business phone number, click on "settings" in the left-side menu of the main admin dashboard, then select "phone number".</p>
                        </div>
                    </PanelRow>
                </PanelBody>
            </InspectorControls>
            {/* <p style={{textAlign: `${props.attributes.theAlignment}`}}> */}
            <p style={{textAlign: 'center'}}>
                <u>
                    Your Text Here (see side panel for instructions)
                </u>
            </p>
        </div>
    )
}