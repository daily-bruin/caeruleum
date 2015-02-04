<?php /* If there are no posts to display, such as an empty archive page */ ?>
<?php if (!have_posts()) { ?>
  <div class="alert alert-block fade in">
    <a class="close" data-dismiss="alert">&times;</a>
    <p><?php _e('Sorry, no results were found.', 'roots'); ?></p>
  </div>
  <?php get_search_form(); ?>
<?php } ?>

<?php /* Start loop */ ?>
<div class="row"></div>

<?php 
    $categoryTitle = single_cat_title('',false);
    $multSection = false;

    $news_cat = get_category_by_slug('news')->term_id;
    $ae_cat = get_category_by_slug('arts-entertainment')->term_id;
    $sports_cat = get_category_by_slug('sports')->term_id;
    $opinion_cat = get_category_by_slug('opinion')->term_id;
    $video_cat = get_category_by_slug('video')->term_id;
    $radio_cat = get_category_by_slug('radio')->term_id;
    $photo_cat = get_category_by_slug('spectrum')->term_id;
    $spotlight_cat = get_category_by_slug('spotlight')->term_id;

    switch ($categoryTitle)
    {
      case "News":
        $sectionTag = "db-story-ns";
        $section_cat = $news_cat;
        $first_side = array( 'numberposts' => 2, 'cat' => $section_cat, 'tag' => 'breaking' );
        $second_side = array( 'numberposts' => 2, 'category__and' => array($section_cat, $video_cat) );
        $third_side = array( 'numberposts' => 2, 'category__and' => array($section_cat, $radio_cat) );
        $fourth_side = array( 'numberposts' => 2, 'category__and' => array($photo_cat, get_category_by_slug('campus-spectrum')->term_id) );
        $side_names = array("Breaking News", "News in Video", "Radio Show: Long Story Short", "News in Photo");
        $side_args = array($first_side,$second_side,$third_side,$fourth_side);
        break;
      case "Sports":
        $sectionTag = "db-story-sp";
        $section_cat = $sports_cat;
        $first_side = array( 'numberposts' => 2, 'cat' => $section_cat, 'tag' => 'breaking' );
        $second_side = array( 'numberposts' => 2, 'category__and' => array($section_cat, $video_cat) );
        $third_side = array( 'numberposts' => 1, 'cat' => get_category_by_slug('out-of-bounds')->term_id );
        $fourth_side = array( 'numberposts' => 2, 'category__and' => array($photo_cat, get_category_by_slug('sports-spectrum')->term_id) );
        $side_names = array("Breaking Sports", "Sports in Video", "Radio Show: Out of Bounds", "Sports in Photo");
        $side_args = array($first_side,$second_side,$third_side,$fourth_side);
        break;
      case "Opinion":
        $sectionTag = "db-story-op";
        $section_cat = $opinion_cat;
        $first_side = array( 'numberposts' => 2, 'cat' => get_category_by_slug('two-cents')->term_id );
        $second_side = array( 'numberposts' => 2, 'cat' => get_category_by_slug('editorial-cartoons')->term_id  );
        $third_side = array( 'numberposts' => 2, 'cat' => get_category_by_slug('editorials')->term_id  );
        $fourth_side = array( 'numberposts' => 2, 'cat' => get_category_by_slug('community')->term_id  );
        $side_names = array("Our Two Cents", "Latest Editorial Cartoons", "From the Editorial Board", "From the Community");
        $side_args = array($first_side,$second_side,$third_side,$fourth_side);
        break;
      case "A&amp;E":
        $sectionTag = "db-story-ae";
        $section_cat = $ae_cat;
        $first_side = array( 'numberposts' => 2, 'cat' => $spotlight_cat);
        $second_side = array( 'numberposts' => 2, 'cat' => get_category_by_slug('ae-columns')->term_id  );
        $third_side = array( 'numberposts' => 2, 'cat' => get_category_by_slug('music')->term_id  );
        $fourth_side = array( 'numberposts' => 2, 'cat' => get_category_by_slug('film-tv')->term_id  );
        $side_names = array("In the Spotlight", "From the Columnists", "Latest in Music", "Latest in Film/TV");
        $side_args = array($first_side,$second_side,$third_side,$fourth_side);
        break;
      default:
        $sectionTag = "";
        $first_side = array( 'numberposts' => 3, 'tag' => 'breaking' );
        $second_side =array( 'numberposts' => 3, 'cat' => get_category_by_slug('blogs')->term_id  );
        $third_side = array( 'numberposts' => 2, 'cat' => $radio_cat);
        $side_names = array("Breaking Stories in the Bruin", "Latest from the Blogs");
        $side_args = array($first_side,$second_side);
        break;
    }
    switch ($categoryTitle)
                  {
                    case "Video":
                      $multSection = true;
                      break;
                    case "Radio":
                      $multSection = true;
                      break;
                    default:
                      break;
                  }
  ?>

<?php 
  $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;?>

<!-- NORMAL CATEGORY FRONT PAGE -->
<?php if(!$multSection): ?>
  <?php if($paged == 1): ?>
  <div class="large-8 columns section-left">
    <?php
      if ($sectionTag != "") :
      $args = array( 'numberposts' => 1, 'tag' => $sectionTag );
      $lastposts = get_posts( $args );
      foreach( $lastposts as $post ) :  setup_postdata($post); ?>
      <div class="db-story-c1">
        <span class="db-section-date">
          <h4><a href="<?php the_category_link(get_the_category()); ?>"><?php the_category_text(get_the_category()); ?></a></h4> 
          <h4>|</h4> 
          <h5><?php the_time('F j, g:i a');?> </h5>
        </span>
        <h2>
          <a href="<?php the_permalink(); ?>"><?php the_headline(); ?></a>
        </h2>
        <div class="db-image text-center">
          <a href="<?php the_permalink(); ?>"><?php the_post_thumbnail('db-category-full'); ?></a>
          <p class="db-image-caption text-left">
            <?php the_post_thumbnail_caption() ?>
          </p>
        </div>
        <?php the_byline_front(); ?>
        <p>
          <?php echo get_the_excerpt();  ?>
        </p>
      </div>
      <hr style="border-top: medium double lightgrey;">
    <?php endforeach; ?>   
  <?php endif; ?>
    <?php while (have_posts()) : the_post(); ?>
      <div class="row">
        <?php if(has_post_thumbnail()): ?>
            <div class="small-8 columns" style="padding-left:0">
        <?php endif; ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
              <span class="db-section-date">
                      <h4><?php the_category(', ');?></h4> 
                      <h4>|</h4> 
                      <h5><?php the_time('F j, g:i a');?> </h5>
                      </span>
            	<h2><a href="<?php the_permalink(); ?>"><?php the_headline(); ?></a></h2>
          
          <div class="entry-content">
          	<?php the_audio(); ?>
    		    <p><?php echo get_the_excerpt();  ?> <a href="<?php the_permalink(); ?>">Read more... </a></p>
        </div>
        <?php if(has_post_thumbnail()): ?>
        </div>
          <div class="small-4 columns">
            <a href="<?php the_permalink(); ?>"><?php the_post_thumbnail( 'db-category-thumb', array('class'=>'category-thumb') ); ?></a>
          </div>
        <?php endif; ?>
        </article>
      </div>
      <hr>
    <?php endwhile; /* End loop */ ?>
    </div>
    <div class="large-4 columns db-section-side">
      
      <?php
      foreach( $side_args as $index => $args ) : ?>
      <h4><?php echo $side_names[$index] ?></h4>
      <?php
      $lastposts = get_posts( $args );
      foreach( $lastposts as $indexP => $post ) :  
        setup_postdata($post); 
      if ($indexP != 0) : ?>
      <hr>
    <?php endif ?>
      <?php if(has_post_thumbnail()): ?>
          <div class="row">
            <a href="<?php the_permalink(); ?>">
                <?php the_post_thumbnail( 'db-category-thumb', array('class'=>'category-thumb') ); ?>
            </a>
          </div>
        <?php endif; ?>
        <div class="row" style="padding-left:0">
            <span class="db-section-date">
                    <h5><?php the_time('F j, g:i a');?> </h5>
            </span>
            <h2><a href="<?php the_permalink(); ?>"><?php the_headline(); ?></a></h2>
        </div>
      <?php endforeach; ?>
      <hr style="border-top: medium double lightgrey;">
      <?php endforeach; ?>
    </div>
  <?php else: ?>
  <!-- LIST -->
    <?php while (have_posts()) : the_post(); ?>
      <div class="row">
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
          <?php if(has_post_thumbnail()): ?>
            <div class="small-4 columns">
              <a href="<?php the_permalink(); ?>"><?php the_post_thumbnail( 'db-category-thumb', array('class'=>'category-thumb') ); ?></a>
            </div>
            <div class="small-8 columns" style="padding-left:0">
          <?php endif; ?>
          
              <span class="db-section-date">
                      <h4><?php the_category(', ');?></h4> 
                      <h4>|</h4> 
                      <h5><?php the_time('F j, g:i a');?> </h5>
                      </span>
              <h2><a href="<?php the_permalink(); ?>"><?php the_headline(); ?></a></h2>
          
          <div class="entry-content">
            <?php the_audio(); ?>
        <p><?php echo get_the_excerpt();  ?> <a href="<?php the_permalink(); ?>">Read more... </a></p>

        <?php if(has_post_thumbnail_caption()): ?>
        <p class="db-image-caption">Photo: <?php the_post_thumbnail_caption() ?>
                          </p>
        <?php endif; ?>
        </div>
        </article>
      </div>
      <hr>
    <?php endwhile; /* End loop */ ?>
  <?php endif; ?>

<!-- MULTIMEDIA CATEGORY STORY LIST -->
<?php else: ?>
  <div class="row">
    <?php $i=0; 
          $j=0;
    while (have_posts()) : the_post(); ?>
    <?php if ($j==0): ?>
      <div class="medium-12 columns">
      <h1>
        <a href="<?php the_permalink(); ?>"> <?php the_headline(); ?></a>
      </h1>
        <div class="db-story-m1">
          <span class="db-section-date">
            <h4><?php the_category(', ');?></h4> 
            <h4>|</h4> 
            <h5><?php the_time('F j, g:i a');?> </h5>
          </span>
            <?php the_content(); ?>
        </div>
      </div>
      <hr>
    <?php ++$j; ?>
    <?php else: ?>
      <div class="small-4 columns">
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
          <?php if(has_post_thumbnail()): ?>
              <div class="row">
                <a href="<?php the_permalink(); ?>">
                    <?php the_post_thumbnail( 'db-category-thumb', array('class'=>'category-thumb') ); ?>
                </a>
              </div>
              <div class="row" style="padding-left:0">
            <?php endif; ?>
                <span class="db-section-date">
                        <h4><?php the_category(', ');?></h4> 
                        <h4>|</h4> 
                        <h5><?php the_time('F j, g:i a');?> </h5>
                </span>
                <h2><a href="<?php the_permalink(); ?>"><?php the_headline(); ?></a></h2>
            <div class="entry-content">
              <?php the_audio(); ?>
                <p><?php echo get_the_excerpt();  ?> <a href="<?php the_permalink(); ?>">More &raquo;</a></p>
            </div>
            </div>
          </article>
          </div>
        <?php if(++$i > 2): 
          $i=0;?>
          </div>
          <div class="row">
        <?php endif; ?>
      <!-- <hr> -->
      <?php endif; ?>
    <?php endwhile; /* End loop */ ?>
  </div>
<?php endif; ?>


</br>
<?php        
$total_pages = $wp_query->max_num_pages;  
if ($total_pages > 1) {  
  $current_page = max(1, get_query_var('paged'));  ?>
<div class="large-12 columns pagination-centered"> 
  <?php echo paginate_links(array(
      'posts_per_page' => 6,
      'base' => get_pagenum_link(1) . '%_%',  
      'format' => '/page/%#%',  
      'current' => $current_page,  
      'total' => $total_pages,  
      'prev_text' => 'Prev',  
      'next_text' => 'Next'  
    )); ?>
  </div><!-- end div.pager -->
<?php
} 
?>
