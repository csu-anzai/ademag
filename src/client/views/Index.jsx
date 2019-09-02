import React, { Component } from "react";

import './index.css'

import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Image,
  Menu,
  Segment,
  Card,
  Icon
} from "semantic-ui-react";

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */

class Index extends Component {
  render() {
    return (
      <Container style={{ marginTop: '3em' }}>
        <Header as='h1'>Theming Examples</Header>

        <Header as='h2' dividing>Site</Header>

        <Grid columns={3} stackable>
          <Grid.Column>
            <Header as='h1'>Heading 1</Header>
            <Header as='h2'>Heading 2</Header>
            <Header as='h3'>Heading 3</Header>
            <Header as='h4'>Heading 4</Header>
            <Header as='h5'>Heading 5</Header>

            <p>
              Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient
              montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula.
            </p>
          </Grid.Column>

          <Grid.Column>
            <Header as='h2'>Example body text</Header>

            <p>
              Nullam quis risus eget <a href='#'>urna mollis ornare</a> vel eu leo. Cum sociis natoque penatibus et magnis
              dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula.
            </p>
            <p>
              <small>This line of text is meant to be treated as fine print.</small>
            </p>
            <p>The following snippet of text is <strong>rendered as bold text</strong>.</p>
            <p>The following snippet of text is <em>rendered as italicized text</em>.</p>
            <p>An abbreviation of the word attribute is <abbr title='attribute'>attr</abbr>.</p>
          </Grid.Column>

          <Grid.Column>
            <Grid
              centered
              columns={3}
              padded
              stackable
              style={{ margin: '-1.5em', width: 400 }}
              textAlign='center'
            >
              <Grid.Column color='red' style={{ margin: '0.5em', height: 50 }}>Red</Grid.Column>
              <Grid.Column color='orange' style={{ margin: '0.5em', height: 50 }}>Orange</Grid.Column>
              <Grid.Column color='yellow' style={{ margin: '0.5em', height: 50 }}>Yellow</Grid.Column>
              <Grid.Column color='olive' style={{ margin: '0.5em', height: 50 }}>Olive</Grid.Column>
              <Grid.Column color='green' style={{ margin: '0.5em', height: 50 }}>Green</Grid.Column>
              <Grid.Column color='teal' style={{ margin: '0.5em', height: 50 }}>Teal</Grid.Column>
              <Grid.Column color='blue' style={{ margin: '0.5em', height: 50 }}>Blue</Grid.Column>
              <Grid.Column color='violet' style={{ margin: '0.5em', height: 50 }}>Violet</Grid.Column>
              <Grid.Column color='purple' style={{ margin: '0.5em', height: 50 }}>Purple</Grid.Column>
              <Grid.Column color='pink' style={{ margin: '0.5em', height: 50 }}>Pink</Grid.Column>
              <Grid.Column color='brown' style={{ margin: '0.5em', height: 50 }}>Brown</Grid.Column>
              <Grid.Column color='grey' style={{ margin: '0.5em', height: 50 }}>Grey</Grid.Column>
              <Grid.Column color='black' style={{ margin: '0.5em', height: 50 }}>Black</Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid>

        <Header as='h2' dividing>Menu</Header>

        <Grid columns={3} doubling>
          <Grid.Column>
            <Menu
              items={[
                { key: '1', name: 'link-1', content: 'Link' },
                { key: '2', name: 'link-2', content: 'Link' },
                { key: '3', name: 'link-3', content: 'Link' },
              ]}
              pointing
              secondary
            />
          </Grid.Column>

          <Grid.Column>
            <Menu
              items={[
                { key: '1', name: 'link-1', content: 'Link' },
                { key: '2', name: 'link-2', content: 'Link' },
                { key: '3', name: 'link-3', content: 'Link' },
              ]}
              pointing
              tabular
            />
          </Grid.Column>

          <Grid.Column>
            <Menu
              items={[
                { key: 'l1', name: 'link-1', content: 'Link' },
                { key: 'l2', name: 'link-2', content: 'Link' },
                { key: 't1', name: 'text-1', content: 'Right text', position: 'right' },
              ]}
              pointing
            />
          </Grid.Column>
        </Grid>

        <Header as='h2' dividing>Buttons</Header>

        <Grid columns='equal'>
          <Grid.Column>
            <Button>Default</Button>
            <Button primary className="ui.black.change">Primary</Button>
            <Button secondary>Secondary</Button>
            <Button basic secondary>Basic</Button>
            <Button compact>Compact</Button>

            <Divider />
            <Button circular>Circular</Button>
            <Button circular icon='download'/>
            <Button circular icon='angle left' basic color="pink"/>
            <Button circular icon='angle right' basic color="pink"/>


            <Divider />

            <Button icon='play circle outline' />
            <Button content='Labeled' icon='rss' labelPosition='left' />
            <Button content='Labeled' icon='rss' labelPosition='right' />

            <Divider />

            <Button.Group>
              <Button>Combo</Button>
            </Button.Group>

            <Divider />

            <Button animated>
              <Button.Content visible>Horizontal</Button.Content>
              <Button.Content hidden>Hidden</Button.Content>
            </Button>

            <Button animated='vertical'>
              <Button.Content visible>Vertical</Button.Content>
              <Button.Content hidden>Hidden</Button.Content>
            </Button>

            <Button animated='fade'>
              <Button.Content visible>Fade In</Button.Content>
              <Button.Content hidden>Hidden</Button.Content>
            </Button>

            <Divider />

            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
            <Button loading basic>Loading</Button>

            <Divider />

            <Button.Group>
              <Button>1</Button>
              <Button>2</Button>
              <Button>3</Button>
            </Button.Group>
   
            <Button.Group>
              <Button icon='align left' />
              <Button icon='align center' />
              <Button icon='align right' />
              <Button icon='align justify' />
            </Button.Group>

            <Button.Group>
              <Button>1</Button>
              <Button.Or />
              <Button>2</Button>
            </Button.Group>

            <Divider />

            <Button.Group attached='top' widths={2}>
              <Button>One</Button>
              <Button>Two</Button>
            </Button.Group>
            <Segment attached>
              <Image src={__API__+'/images/react.png'} />
            </Segment>
            <Button.Group attached='bottom' widths={2}>
              <Button>One</Button>
              <Button>Two</Button>
            </Button.Group>
          </Grid.Column>

          <Grid.Column>
            <Button size='mini'>Mini</Button>
            <Button size='tiny'>Tiny</Button>
            <Button size='small'>Small</Button>
            <Button size='medium'>Medium</Button>
            <Button size='large'>Large</Button>
            <Button size='big'>Big</Button>
            <Button size='huge'>Huge</Button>
            <Button size='massive'>Massive</Button>
            <Divider />

            <Button color='yellow' style={{ marginBottom: '1em' }}>Yellow</Button>
            <Button color='orange' style={{ marginBottom: '1em' }}>Orange</Button>
            <Button color='green' style={{ marginBottom: '1em' }}>Green</Button>
            <Button color='teal' style={{ marginBottom: '1em' }}>Teal</Button>
            <Button color='blue' style={{ marginBottom: '1em' }}>Blue</Button>
            <Button color='purple' style={{ marginBottom: '1em' }}>Purple</Button>
            <Button color='pink' style={{ marginBottom: '1em' }}>Pink</Button>
            <Button color='red' style={{ marginBottom: '1em' }}>Red</Button>
            <Button color='black' style={{ marginBottom: '1em' }}>Black</Button>

            <Divider />

            <Segment inverted>
              <Button inverted>Inverted</Button>
              <Button basic inverted>Basic</Button>
              <Button color='blue' inverted>Colored</Button>
              <Button basic color='blue' inverted>Basic Colored</Button>
            </Segment>
          </Grid.Column>
        </Grid>


        <Card>
          <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' style={{height:'500px', width:'350px'}} wrapped ui={false} />
          <Card.Content>
            <Card.Header >Matthew</Card.Header>
            <Card.Header>Marie 2</Card.Header>
            <Card.Header>pas des enfant</Card.Header>
            <Card.Meta>
              <span className='date'>Joined in 2015</span>
            </Card.Meta>
            <Card.Description>
              Matthew is a musician living in Nashville.
            </Card.Description>
            <Card.Description>
              Matthew is a musician living in Nashville.
            </Card.Description>
          </Card.Content>





          <Card.Content extra>
                  <a>
                    <Icon name='user' />
                    22 Friends
                  </a>
                </Card.Content>
              </Card>
              <Card>
            <Card.Content>
              <Image
                floated='right'
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
              />
              <Card.Header>Steve Sanders</Card.Header>
              <Card.Meta>Friends of Elliot</Card.Meta>
              <Card.Description>
                Steve wants to add you to the group <strong>best friends</strong>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className='ui two buttons'>
                <Button basic color='green'>
                  Approve
                </Button>
                <Button basic color='red'>
                  Decline
                </Button>
              </div>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Image
                floated='right'
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/molly.png'
              />
              <Card.Header>Molly Thomas</Card.Header>
              <Card.Meta>New User</Card.Meta>
              <Card.Description>
                Molly wants to add you to the group <strong>musicians</strong>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className='ui two buttons'>
                <Button basic color='green'>
                  Approve
                </Button>
                <Button basic color='red'>
                  Decline
                </Button>
              </div>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Image
                floated='right'
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
              />
              <Card.Header>Jenny Lawrence</Card.Header>
              <Card.Meta>New User</Card.Meta>
              <Card.Description>
                Jenny requested permission to view your contact details
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className='ui two buttons'>
                <Button basic color='green'>
                  Approve
                </Button>
                <Button basic color='red'>
                  Decline
                </Button>
              </div>
            </Card.Content>
          </Card>
      </Container>
    );
  }
}

export default Index;
